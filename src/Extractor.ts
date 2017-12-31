import { DOMParser } from 'xmldom';
import * as xpath from 'xpath';
import ExtractorError from './errors/ExtractorError';
import { Site } from './Site';

class Extractor {
  private doc: Node;

  constructor(private site: Site, private content: string) {
    this.doc = new DOMParser().parseFromString(content);
  }

  public extractPreviousPage(): string {
    const { selector, normalizer } = this.site.getFields().previousPage;
    const node = xpath.select(selector, this.doc, true);

    if (node === undefined) {
      throw new ExtractorError(this.site, 'No previous page found.');
    }

    const previousPage = node.value;

    return typeof normalizer === 'function' ? normalizer(previousPage) : previousPage;
  }

  public extractVideosUrl(): string[] {
    const { selector, normalizer } = this.site.getFields().videosUrl;
    const nodes = xpath.select(selector, this.doc);

    if (nodes.length === 0) {
      throw new ExtractorError(this.site, 'No videos found.');
    }

    const videosUrl = nodes.map(node => node.value);

    return typeof normalizer === 'function' ? normalizer(videosUrl) : videosUrl;
  }

  public extractVideosThumbnailUrl(): string[] {
    const { selector, normalizer } = this.site.getFields().videosThumbnailUrl;
    const nodes = xpath.select(selector, this.doc);

    if (nodes.length === 0) {
      throw new ExtractorError(this.site, 'No thumbnails found.');
    }

    const videosUrl = nodes.map(node => node.value);

    return typeof normalizer === 'function' ? normalizer(videosUrl) : videosUrl;
  }
}

export {
  Extractor,
};