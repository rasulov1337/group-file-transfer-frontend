export const ROUTES = {
    HOME: "/",
    RECIPIENTS: "/recipients/",
    RECIPIENT: "/recipient/:id",
};

export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
    HOME: "Главная",
    RECIPIENTS: "Получатели",
    RECIPIENT: "Получатель",
};
