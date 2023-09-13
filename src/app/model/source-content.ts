export class ContentSource {
    _id?: string;
    title?: string;
    sourceUrl_language_files?: ContentVideoUrl[] = [];
    subtitles_language_files?: ContentSubtitles[] = [];
    subtitles: { src: string; srclang: string; label: string; default: boolean }[] = [];
    videoUrl?: string;

    constructor(values: object = {})
    {
        Object.assign(this, values);
    }

    static loadSourceContent(source: ContentSource): ContentSource {
        source.subtitles = []
        source.videoUrl = "";
        const subtitlesInfo = source.subtitles_language_files
        if (subtitlesInfo!== null && subtitlesInfo!.length > 0) {
            const item = subtitlesInfo![0];
            let index = 0;
            for (const key of Object.keys(item)) {
                let subtitle = {
                    src : item[key],
                    srclang : key,
                    label: key,
                    default: index == 0
                }
                source.subtitles.push(subtitle);
                index++;
            }
        }
        const videoUrlInfo = source.sourceUrl_language_files

        if (videoUrlInfo!== null && videoUrlInfo!.length > 0) {
            const item = videoUrlInfo![0];
            for (const key of Object.keys(item)) {
                source.videoUrl = item[key][0];
            }
        }
        return source;
    }
}

export class ContentSubtitles {
     [key: string]: string 
}

export class ContentVideoUrl {
    [key: string]: [string] 
}