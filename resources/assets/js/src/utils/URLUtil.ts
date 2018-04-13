class URLUtil {
    public static generateURLByPosition(url: string, position: string): string {
        if (position) {
            url = `${url}/${position}`;
        }

        return url;
    }

    public static generateURLByDates(url: string, dateFrom: string = null, dateTo: string = null): string {
        if (dateFrom && dateTo) {
            url = `${url}?start_date=${dateFrom}&end_date=${dateTo}`;
        }

        return url;
    }
}

export default URLUtil;
