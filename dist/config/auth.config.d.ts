export declare const authConfig: (() => {
    jwt: {
        secret: string;
        expires: string;
        refresh: {
            secret: string;
            expiresIn: number;
            longExpiresIn: number;
        };
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    jwt: {
        secret: string;
        expires: string;
        refresh: {
            secret: string;
            expiresIn: number;
            longExpiresIn: number;
        };
    };
}>;
