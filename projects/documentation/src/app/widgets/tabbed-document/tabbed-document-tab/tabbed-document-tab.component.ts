import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabbed-document-tab',
  templateUrl: './tabbed-document-tab.component.html',
  styleUrls: ['./tabbed-document-tab.component.scss']
})
export class TabbedDocumentTabComponent implements OnInit {

    @Input() markdownSrc!: string;
    headings: Element[] = [];

    constructor(
        private el: ElementRef
    ) { }

    ngOnInit(): void {
    }

    onLoad(): void {
        this.setHeadings(this.el);
    }

    setHeadings(el: ElementRef): void {
        const headings: Element[] = [];
        el.nativeElement.querySelectorAll('h2')
            .forEach((x: Element) => {
                const text = x.innerHTML.replace(' ', '');
                let reformattedText = '';
                for(let i = 0; i < text.length; i++) {
                    const character = text.charAt(i);
                    if (character === character.toUpperCase()) {
                        if (i > 0) {
                            reformattedText += '-';
                        }
                        
                        reformattedText += character.toLowerCase();
                    } else {
                        reformattedText += character;
                    }
                }
                x.id = reformattedText;
                headings.push(x);
            });
        this.headings = headings;
    }

    private stripContent(el: ElementRef): void {
        el.nativeElement
            .querySelector('markdown')!
            .querySelectorAll('markdown > p:nth-child(-n + 2), #ngx-markdown, #table-of-contents + ul, #table-of-contents')
            .forEach((x: Element) => x.remove());
    }

}
