import APPCONFIGS from "@/configs";

export default class Constants {
    static readonly DRIVE_URL = APPCONFIGS.drive;
    static readonly SITE_IMG_URL = `${ Constants.DRIVE_URL}uploads/site/`;
}