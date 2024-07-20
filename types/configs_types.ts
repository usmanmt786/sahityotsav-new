export default interface ConfigType{
    type: 'unit' | 'sector' | 'division' | 'sector' | 'district' | 'state';
    year: number;
    typeName:string;
    venue: string;
    venueDates: string;

}