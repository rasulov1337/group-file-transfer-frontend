import "./RecipientsPage.css";
import UserCard from "../UserCard/UserCard";
import ApiClient from "../../modules/ApiClient";
import { RECIPIENTS_MOCK } from "../../modules/Mocks";
import { ReactElement, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS } from "../../modules/Routes";

interface DraftTransferInfo {
    draftId: number | null;
    draftRecipientsLen: number;
}

interface RecipientCardData {
    id: number;
    name: string;
    avatar: string;
    phone: string;
}

type DataArray = (RecipientCardData | DraftTransferInfo)[];

const RecipientsPage = () => {
    const [pageData, setPageData] = useState<DataArray>();
    const [recipientNameQuery, setRecipientNameQuery] = useState<string>();

    useEffect(() => {
        (async () => {
            const data = await ApiClient.getRecipients(
                recipientNameQuery ? recipientNameQuery : undefined
            );
            setPageData(data);
        })();
    }, [recipientNameQuery]);

    if (!pageData) {
        return (
            <div className="loading-screen">
                <Spinner animation="border"></Spinner>
            </div>
        );
    }

    // const draftTransferInfo = pageData.at(-1) as DraftTransferInfo;
    const recipientsData = pageData.slice(0, -1) as RecipientCardData[];
    const cards: ReactElement[] = [];
    recipientsData.forEach((recipient, i) => {
        cards.push(<UserCard key={i} {...recipient}></UserCard>);
    });

    return (
        <>
            <div className="container">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.RECIPIENTS }]} />
            </div>

            <div className="block users-block">
                <form
                    action="{% url 'index' %}"
                    method="get"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(
                            e.target as HTMLFormElement
                        );
                        const recipientName = formData.get(
                            "recipient-name"
                        ) as string;
                        setRecipientNameQuery(recipientName);
                    }}
                >
                    <input
                        className="search-field"
                        type="text"
                        id="name"
                        name="recipient-name"
                        minLength={1}
                        maxLength={70}
                        placeholder="Поиск"
                    />
                </form>

                <div className="grid-block">{cards}</div>
            </div>
        </>
    );
};

export default RecipientsPage;
