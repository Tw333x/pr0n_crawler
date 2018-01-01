import * as sec from 'sec';
import { Site } from '../Site';

class YouJizzSite extends Site {
  public getUrl(): string {
    return 'https://www.youjizz.com';
  }

  public getName(): string {
    return 'YouJizz';
  }

  public getFavicon(): string {
    return 'https://www.youjizz.com/favicon.ico';
  }

  public getEntryPoint(): string {
    return 'https://www.youjizz.com/newest-clips/100.html';
  }

  public getFields(): ISiteFields {
    return {
      previousPage: {
        selector: '(//*[contains(@class, "pagination")]/li[contains(@class, "active")]/preceding-sibling::li/a/@href)[last()]',
        normalizer: (previousPage: string) => String(new URL(previousPage, this.getUrl())),
      },
      videosUrl: {
        selector: '//*[contains(@class, "video-title")]/a/@href',
        normalizer: (urls: string[]) => urls.map(url => String(new URL(url, this.getUrl()))),
      },
      videosThumbnailUrl: {
        selector: '//*[contains(@class, "video-item")]/div/a/img[contains(@class, "lazy")]/@data-original',
        normalizer: (thumbnailsUrl: string[]) => thumbnailsUrl.map(url => String(new URL(url, this.getUrl()))),
      },
      video: {
        title: {
          selector: '//title/text()',
        },
        duration: {
          selector: '(//*[contains(@class, "video-info")]/div[3]/text())[last()]',
          normalizer: (duration: string) => sec(duration),
        },
        tags: {
          selector: '(//*[contains(@class, "tag-links")])[last()]/ul/li[contains(@class, "red-li")]/a/text()',
        },
      },
    };
  }
}

export { YouJizzSite };
