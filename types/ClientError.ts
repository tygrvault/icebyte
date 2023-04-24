export default interface ClientError {
    url: string;
    status: number;
    response: {
        code: number;
        message: string;
        data: {
            [x: string]: {
                code: string;
                message: string;
            },
        }
    },
    isAbort: boolean;
    originalError: any;
    name: string;
}