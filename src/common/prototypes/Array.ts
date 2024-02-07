export {};

declare global {
    interface Array<T> {
        asyncForEach(callback: CallableFunction): Promise<any>;
    }
}

Array.prototype.asyncForEach = async function (callback: CallableFunction): Promise<any> {
    for (let index = 0; index < this.length; index++) {
        await callback(this[index], index, this);
    }
};
