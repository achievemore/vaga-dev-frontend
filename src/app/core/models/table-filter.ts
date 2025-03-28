export interface TableFilter {
    name: string;
    label: string;
    type: 'string' | 'select' | 'number' | 'general'; 
    selectOptions?: string[];
    value?: any;
}