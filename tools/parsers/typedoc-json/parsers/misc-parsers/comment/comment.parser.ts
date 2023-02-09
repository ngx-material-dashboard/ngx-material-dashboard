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

    public usageNotesTypeMap: { [type: string]: string };
    public usageNoteTypes: string[] = [];

    public constructor(data: CommentParserData) {
        const { description, blockTags, modifierTags } = data;

        this.description = description;
        this.blockTags = blockTags;
        this.modifierTags = modifierTags;
        this.usageNotesTypeMap = {};

        this.initUsageNoteTypes();
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
        return this.blockTags.filter((tag) => tag.name === 'overviewDetails');
    }

    public get usageNotes(): BlockTag[] {
        return this.blockTags.filter((tag) => tag.name === 'usageNotes');
    }

    private initUsageNoteTypes(): void {
        this.usageNotes.forEach((tag) => {
            let usageNoteText: string;
            for (let i = 0; i < tag.text.length; i++) {
                // find text that starts with ```, which should be code
                if (tag.text[i].search(/```[a-z]+/) === 0) {
                    // separate code and get type of code
                    const note = tag.text[i].split('\n');
                    usageNoteText = note[0].replace('```', '').trim();
                    if (usageNoteText !== '') {
                        this.usageNoteTypes.push(usageNoteText);

                        // add text for note and header details (if header exists)
                        this.usageNotesTypeMap[
                            `${usageNoteText}-${this.usageNoteTypes.length - 1}`
                        ] = note.join('\n');
                        // tag.text[i - 1].search(/## [a-zA-Z]+/) === 0
                        //     ? [tag.text[i - 1], ...note].join('\n')
                        //     : note.join('\n');
                    }
                }
            }
        });
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
                text: tag.content.map((content) =>
                    content.kind === 'inline-tag'
                        ? `{${content.tag} ${content.text}}`
                        : content.text
                )
                //.join('')
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
