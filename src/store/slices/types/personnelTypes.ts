import { IManagedDoctor, IManagedNurse, IManagedOther } from '../../../pages/personnel-management/mock';

export interface PersonnelState {
    doctors: IManagedDoctor[];
    nurses: IManagedNurse[];
    others: IManagedOther[];
    searchQuery: string;
    isLoading: boolean;
    error: string | null;
}
