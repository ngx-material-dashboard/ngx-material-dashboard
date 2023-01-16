import { JSONOutput } from 'typedoc';
import { BlockTag } from './interfaces/block-tag.interface';
import { CommentParserData } from './interfaces/data.interface';
import { CommentParserJson } from './interfaces/json.interface';

/**
 * Parses data from a comment reflection.
 * @since 1.0.0
 */
export class CommentParser {
    /**
     * The description of this comment.
     * @since 1.0.0
     */
    public readonly description: string | null;

    /**
     * The block tags of this comment.
     * @since 1.0.0
     */
    public readonly blockTags: BlockTag[];

    /**
     * The modifier tags of this comment.
     * @since 1.0.0
     */
    public readonly modifierTags: string[];

    public constructor(data: CommentParserData) {
        const { description, blockTags, modifierTags } = data;

        this.description = description;
        this.blockTags = blockTags;
        this.modifierTags = modifierTags;
    }

    /**
     * The filtered `@see` tags of this comment.
     * @since 1.0.0
     */
    public get see(): BlockTag[] {
        return this.blockTags.filter((tag) => tag.name === 'see');
    }

    /**
     * The filtered `@example` tags of this comment.
     * @since 1.0.0
     */
    public get example(): BlockTag[] {
        return this.blockTags.filter((tag) => tag.name === 'example');
    }

    /**
     * Whether the comment has an `@deprecated` tag.
     * @since 1.0.0
     */
    public get deprecated(): boolean {
        return this.modifierTags.some((tag) => tag === 'deprecated');
    }

    public get overviewDetails(): BlockTag[] {
        return this.blockTags.filter((tag) => tag.name === 'overviewdetails');
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): CommentParserJson {
        return {
            description: this.description,
            blockTags: this.blockTags,
            modifierTags: this.modifierTags
        };
    }

    /**
     * Generates a new {@link CommentParser} instance from the given data.
     * @since 1.0.0
     * @param comment The comment to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromTypeDoc(
        comment: JSONOutput.Comment
    ): CommentParser {
        const { summary, blockTags = [], modifierTags = [] } = comment;

        return new CommentParser({
            description: summary.length
                ? summary
                      .map((summary) =>
                          summary.kind === 'inline-tag'
                              ? `{${summary.tag} ${summary.text}}`
                              : summary.text
                      )
                      .join('')
                : null,
            blockTags: blockTags.map((tag) => ({
                name: tag.name ?? tag.tag.replace(/@/, ''),
                text: tag.content
                    .map((content) =>
                        content.kind === 'inline-tag'
                            ? `{${content.tag} ${content.text}}`
                            : content.text
                    )
                    .join('')
            })),
            modifierTags
        });
    }

    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromJson(json: CommentParserJson): CommentParser {
        const { description, blockTags, modifierTags } = json;

        return new CommentParser({
            description,
            blockTags,
            modifierTags
        });
    }
}
