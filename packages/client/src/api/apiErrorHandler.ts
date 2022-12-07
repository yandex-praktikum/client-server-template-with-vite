export const apiErrorHandler = (status: number) => {
    //TODO: добавить обработку  400 и 500

    if (status === 401) {
        window.location.replace("/sign-in");
    }

    if (status === 404) {
        window.location.replace("/error404");
    }
};
