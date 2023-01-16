export interface SourceParserData {
    /**
     * The line number of this source.
     * @since 1.0.0
     */
    line: number;

    /**
     * The file name of this source.
     * @since 1.0.0
     */
    file: string;

    /**
     * The path of this source.
     * @since 1.0.0
     */
    path: string;

    /**
     * The url of this source.
     * @since 2.4.0
     */
    url: string | null;
}
