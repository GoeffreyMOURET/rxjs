export default class ConsoleUtils {
    static log<T>(params: T): void {
        console.log(params);
    }

    static error<T>(params: T): void {
        console.error(params);
    }
}