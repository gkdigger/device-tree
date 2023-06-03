export default interface IConnectionClient {
    connect(callback: (data: any) => void): void;
}