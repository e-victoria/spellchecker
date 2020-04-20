export default class StringHasher {
    public hash(s: string): number {
        let hash: number = 0;
        if (s.length == 0) return hash;
        for (let i: number = 0; i < s.length; i++) {
            let char: number = s.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }
}
