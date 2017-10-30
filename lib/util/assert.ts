export default function assert(test: boolean, message: string) {
    if (!test) { throw new Error(message) }
}
