/**
 * Classes that imeplement this behavior are serializable and deserializable for data-saving.
 */
interface ISerializable {
    serialize(): string,
    deserialize(json: string): void
}

export default ISerializable;