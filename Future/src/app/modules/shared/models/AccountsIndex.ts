import { AccountsForms } from "./accounts-forms";
import { AccountsType } from "./accounts-type";
import { Branch } from "./branch";

export interface AccountsIndex {
  accIndex_Code?: number,
  accIndex_NodeType_FK?: number,
  accIndex_Name_AR?: string,
  accIndex_Name_EN?: string,
  accIndex_Number?: number,
  accIndex_Type_FK?: number,
  c_AccountsTypes?: AccountsType,
  accIndex_Form_FK?: number,
  c_AccountsForms?: AccountsForms,
  accIndex_AppearIN_FK?: number,
  is_transferred?: boolean,
  branch_No?: number,
  branch?: Branch,
  accIndex_Parent_Code_FK?: number,
  accountsIndex_Parent?: string,
  children?: AccountsIndex[];
  
}
