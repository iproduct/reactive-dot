import { MenuItem } from 'primeng/primeng';

export interface RdMenuItem extends MenuItem {
    hint?: string;
    items?: RdMenuItem[];
}
