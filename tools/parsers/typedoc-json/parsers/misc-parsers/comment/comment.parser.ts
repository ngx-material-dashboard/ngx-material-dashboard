/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { JSONOutput } from 'typedoc';
import { CommentParser as TypedocCommentParser } from 'typedoc-json-parser';
import { CommentParserJson } from './interfaces/json.interface';

/**
 * Parses data from a comment reflection.
 * @since 1.0.0
 */
export class CommentParser extends TypedocCommentParser {
    public deprecatedNotes?: string;
    public usageNoteHeaders: string[] = [];
    public usageNotesTypeMap: { [type: string]: string };
    public usageNoteTypes: string[] = [];

    public constructor(data: TypedocCommentParser.Data) {
        super({
            blockTags: data.blockTags,
            description: data.description,
            modifierTags: data.modifierTags
        });

        this.usageNotesTypeMap = {};
        this.initUsageNoteTypes();

        const deprecatedBlock = this.blockTags.filter(
            (tag) => tag.name === 'deprecated'
        );
        if (deprecatedBlock.length > 0) {
            this.deprecatedNotes = deprecatedBlock[0].text.replaceAll(
                '\n',
                ' '
            );
        }
    }

    public get overviewDetails(): TypedocCommentParser.BlockTag[] {
        return this.blockTags.filter((tag) => tag.name === 'overviewDetails');
    }

    public get usageNotes(): TypedocCommentParser.BlockTag[] {
        return this.blockTags.filter((tag) => tag.name === 'usageNotes');
    }

    private initUsageNoteTypes(): void {
        this.usageNotes.forEach((tag) => {
            let usageNoteText: string;
            const text = tag.text.split('\n');
            for (let i = 0; i < text.length; i++) {
                const note = [];
                if (text[i].search(/#+/) >= 0) {
                    // add header text if it exists
                    note.push(text[i]);
                    i++;
                }
                // find text that starts with ```, which should be code
                if (text[i].search(/```[a-z]+/) >= 0) {
                    usageNoteText = text[i].replace('```', '').trim();
                    if (usageNoteText !== '') {
                        this.usageNoteTypes.push(usageNoteText);
                        while (i < text.length && text[i] != '```') {
                            note.push(text[i++]);
                        }
                        note.push('```');
                        // add text for note and header details (if header exists)
                        this.usageNotesTypeMap[
                            `${usageNoteText}-${this.usageNoteTypes.length - 1}`
                        ] = note.join('\n');
                        //console.log(note);
                        // tag.text[i - 1].search(/## [a-zA-Z]+/) === 0
                        //     ? [tag.text[i - 1], ...note].join('\n')
                        //     : note.join('\n');
                    }
                    //}
                }
            }
        });
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public override toJSON(): CommentParserJson {
        return {
            deprecatedNotes: this.deprecatedNotes,
            description: this.description,
            blockTags: this.blockTags,
            modifierTags: this.modifierTags,
            overviewDetails: this.overviewDetails,
            usageNotes: this.usageNotes
        };
    }

    /**
     * Generates a new {@link CommentParser} instance from the given data.
     * @since 1.0.0
     * @param comment The comment to generate the parser from.
     * @returns The generated parser.
     */
    public static override generateFromTypeDoc(
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
    public static override generateFromJson(
        json: TypedocCommentParser.Json
    ): CommentParser {
        const { description, blockTags, modifierTags } = json;

        const customBlockTags = blockTags.map((it) => {
            return {
                name: it.name,
                text: it.text,
                textArray: it.text.split('\n')
            };
        });
        return new CommentParser({
            description,
            blockTags: customBlockTags,
            modifierTags
        });
    }
}
