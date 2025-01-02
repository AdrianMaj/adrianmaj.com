import { SerializedHeadingNode } from "@payloadcms/richtext-lexical";
import { HeadingNode } from "@payloadcms/richtext-lexical/lexical/rich-text";
import {
  DOMConversion,
  DOMConversionMap,
  DOMConversionOutput,
  ElementFormatType,
  setNodeIndentFromDOM,
  Spread,
} from "@payloadcms/richtext-lexical/lexical";

export type SerializedCustomHeadingNode = Spread<
  {
    type: "custom-heading";
    style: string;
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  },
  SerializedHeadingNode
>;

type HeadingElement = HTMLHeadingElement & { tagName: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" };

const converter = (): DOMConversion<HeadingElement> | null => ({
  conversion(element: HeadingElement): DOMConversionOutput {
    const node = new CustomHeadingNode(element.tagName);

    if (element.style) {
      node.setFormat(element.style.textAlign as ElementFormatType);

      if (element.style.backgroundColor) {
        node.setStyle("background-color: " + element.style.backgroundColor);
      }

      setNodeIndentFromDOM(element, node);
    }

    return { node };
  },
  priority: 0,
});
// @ts-ignore
export class CustomHeadingNode extends HeadingNode {
  static override getType() {
    return "custom-heading";
  }
  // @ts-ignore
  static override clone(node) {
    return new CustomHeadingNode(node.getTag(), node.__key);
  }

  static override importJSON(serializedNode: SerializedCustomHeadingNode): CustomHeadingNode {
    const node = new CustomHeadingNode(serializedNode.tag);

    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    node.setStyle(serializedNode.style);

    return node;
  }

  static override importDOM(): DOMConversionMap<HTMLHeadingElement> | null {
    return {
      // @ts-ignore
      h1: converter,
      // @ts-ignore
      h2: converter,
      // @ts-ignore
      h3: converter,
      // @ts-ignore
      h4: converter,
      // @ts-ignore
      h5: converter,
      // @ts-ignore
      h6: converter,
    };
  }

  // @ts-ignore
  override createDOM(config) {
    const dom = super.createDOM(config);

    dom.setAttribute("style", this.__style);

    return dom;
  }

  override updateDOM(_: HeadingNode, dom: HTMLElement): boolean {
    dom.setAttribute("style", this.__style);

    return true;
  }

  override exportJSON(): SerializedCustomHeadingNode {
    return {
      ...super.exportJSON(),
      tag: this.__tag,
      type: "custom-heading",
      style: this.__style,
    };
  }
}
