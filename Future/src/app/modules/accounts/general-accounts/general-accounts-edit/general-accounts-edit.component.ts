import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { AccountsForms } from 'src/app/modules/shared/models/accounts-forms';
import { AccountsIndex } from 'src/app/modules/shared/models/AccountsIndex';
import { AccountsType } from 'src/app/modules/shared/models/accounts-type';
import { Branch } from 'src/app/modules/shared/models/branch';
import { AccountsFormsService } from 'src/app/modules/shared/services/accounts-forms.service';
import { AccountsIndexService } from 'src/app/modules/shared/services/AccountsIndex.service';
import { AccountsTypeService } from 'src/app/modules/shared/services/accounts-type.service';

@Component({
  selector: 'app-general-accounts-edit',
  templateUrl: './general-accounts-edit.component.html',
  styleUrls: ['./general-accounts-edit.component.scss']
})
export class GeneralAccountsEditComponent implements OnInit {
  _Subscription!: Subscription;
  AccountsForms_List : AccountsForms[]=[];
  AccountsType_List : AccountsType[]=[];
 
  Form!: FormGroup;
  AccIndex_Name_AR!: FormControl<string | null>;
  AccIndex_Name_EN!: FormControl<string | null>;
  AccIndex_Number!: FormControl<number | null>;
  AccIndex_Type_FK!: FormControl<number | null>;
  AccIndex_Form_FK!: FormControl<number | null>;
  AccIndex_AppearIN_FK!: FormControl<number | null>;
  accIndex_Code!: FormControl<number | null>;
  accIndex_NodeType_FK!: FormControl<number | null>;
  accIndex_Parent_Code_FK!: FormControl<number | null>;
  accountsIndex_Parent!: FormControl<string | null>;
  children!: FormControl<AccountsIndex[] | null>;
  c_AccountsForms!: FormControl<AccountsForms | null>;
  c_AccountsTypes!: FormControl<AccountsType | null>;
  is_transferred!: FormControl<boolean | null>;
  branch!: FormControl<Branch | null>;
  branch_No!: FormControl<number | null>;

  selected_AccountsIndex: AccountsIndex= {};

  selectedNodeAncestors= '';

  LoadingFinish : boolean;

  constructor(public dialogRef: MatDialogRef<GeneralAccountsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {type: string, action: string, node: AccountsIndex},
    private accountsFormsService: AccountsFormsService,
    private accountsTypeService: AccountsTypeService,
    private fb: UntypedFormBuilder,
    private accountsIndexService: AccountsIndexService,
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) private _document: Document) { 
      this.LoadingFinish = true;
      this.BuildForm();
      this.Load_Data();
      
        this.selected_AccountsIndex= data.node;
        this.SetValue();
      
    }

    public BuildForm() {
      try {
  
        this.Form = this.fb.group(
          {
            'AccIndex_Name_AR:': this.AccIndex_Name_AR = new FormControl<string | null>(null, [Validators.required]),
            'AccIndex_Name_EN:': this.AccIndex_Name_EN = new FormControl<string | null>(null, [Validators.required]),
            'AccIndex_Number:': this.AccIndex_Number = new FormControl<number | null>(null, this.data.type=='account'?[Validators.required]:[]),
            'AccIndex_Type_FK:': this.AccIndex_Type_FK = new FormControl<number | null>(null, this.data.type=='account'?[Validators.required]:[]),
            'AccIndex_Form_FK:': this.AccIndex_Form_FK = new FormControl<number | null>(null, this.data.type=='account'?[Validators.required]:[]),
            'AccIndex_AppearIN_FK:': this.AccIndex_AppearIN_FK = new FormControl<number | null>(null, this.data.type=='account'?[Validators.required]:[]),
            'accIndex_Code:': this.accIndex_Code = new FormControl<number | null>(null, []),
            'accIndex_NodeType_FK:': this.accIndex_NodeType_FK = new FormControl<number | null>(null, []),
            'accIndex_Parent_Code_FK:': this.accIndex_Parent_Code_FK = new FormControl<number | null>(null, []),
            'accountsIndex_Parent:': this.accountsIndex_Parent = new FormControl<string | null>(null, []),
            'children:': this.children = new FormControl<AccountsIndex[] | null>(null, []),
            'c_AccountsForms:': this.c_AccountsForms = new FormControl<AccountsForms | null>(null, []),
            'c_AccountsTypes:': this.c_AccountsTypes = new FormControl<AccountsType | null>(null, []),
            'is_transferred:': this.is_transferred = new FormControl<boolean | null>(null, []),
            'branch:': this.branch = new FormControl<Branch | null>(null, []),
            'branch_No:': this.branch_No = new FormControl<number | null>(null, []),
          },
        );
  
      } catch (Exception: any) {
        console.log(Exception);
      }
    }

    Load_Data() {
      this.LoadingFinish = false;
      this._Subscription = forkJoin(
        this.Load_AccountsForms(),
        this.Load_AccountsType(),
        ).subscribe(
          res => {
            this.AccountsForms_List = res[0];
            this.accountsFormsService.list_AccountsForms = this.AccountsForms_List;
            this.accountsFormsService.List_AccountsForms_BehaviorSubject.next(this.AccountsForms_List);
            this.AccountsType_List = res[1];
            this.accountsTypeService.list_AccountsType = this.AccountsType_List;
            this.accountsTypeService.List_AccountsType_BehaviorSubject.next(this.AccountsType_List);

            this.LoadingFinish = true;

            this.AccIndex_AppearIN_FK.setValue(1);
            this.AccIndex_Type_FK.setValue(1);
            this.AccIndex_Form_FK.setValue(1);

          }
          )
        }
      
        Load_AccountsForms(){
          if (this.accountsFormsService.list_AccountsForms == null ||
            this.accountsFormsService.list_AccountsForms == undefined ||
            this.accountsFormsService.list_AccountsForms.length == 0)
            return this.accountsFormsService.list();
          return of(this.accountsFormsService.list_AccountsForms);
        }

        Load_AccountsType(){
          if (this.accountsTypeService.list_AccountsType == null ||
            this.accountsTypeService.list_AccountsType == undefined ||
            this.accountsTypeService.list_AccountsType.length == 0)
            return this.accountsTypeService.list();
          return of(this.accountsTypeService.list_AccountsType);
        }


        
  ngOnInit() {      
  }

  public SetValue() {
    try {


      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.accIndex_Name_AR != null)
        this.AccIndex_Name_AR.setValue(this.selected_AccountsIndex.accIndex_Name_AR);
        
      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.accIndex_Name_EN != null)
        this.AccIndex_Name_EN.setValue(this.selected_AccountsIndex.accIndex_Name_EN);

      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.accIndex_AppearIN_FK != null)
        this.AccIndex_AppearIN_FK.setValue(this.selected_AccountsIndex.accIndex_AppearIN_FK);

      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.accIndex_Code != null)
        this.accIndex_Code.setValue(this.selected_AccountsIndex.accIndex_Code);
      
      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.accIndex_Form_FK != null)
        this.AccIndex_Form_FK.setValue(this.selected_AccountsIndex.accIndex_Form_FK);
      
      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.accIndex_Type_FK != null)
        this.AccIndex_Type_FK.setValue(this.selected_AccountsIndex.accIndex_Type_FK);
      
      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.accIndex_NodeType_FK != null)
        this.accIndex_NodeType_FK.setValue(this.selected_AccountsIndex.accIndex_NodeType_FK);
      
      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.accIndex_Number != null)
        this.AccIndex_Number.setValue(this.selected_AccountsIndex.accIndex_Number);
      
      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.accIndex_Parent_Code_FK != null)
        this.accIndex_Parent_Code_FK.setValue(this.selected_AccountsIndex.accIndex_Parent_Code_FK);
      
      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.accountsIndex_Parent != null)
        this.accountsIndex_Parent.setValue(this.selected_AccountsIndex.accountsIndex_Parent);
      
      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.children != null)
        this.children.setValue(this.selected_AccountsIndex.children);
      
      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.c_AccountsForms != null)
        this.c_AccountsForms.setValue(this.selected_AccountsIndex.c_AccountsForms);
      
      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.c_AccountsTypes != null)
      this.c_AccountsTypes.setValue(this.selected_AccountsIndex.c_AccountsTypes);
      
      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.is_transferred != null)
      this.is_transferred.setValue(this.selected_AccountsIndex.is_transferred);
      
      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.branch != null)
      this.branch.setValue(this.selected_AccountsIndex.branch);
      
      if (this.selected_AccountsIndex != null && this.selected_AccountsIndex.branch_No != null)
      this.branch_No.setValue(this.selected_AccountsIndex.branch_No);

    } catch (ex: any) {


    }

  }

  getValue(){
    this.selected_AccountsIndex.accIndex_Name_AR= this.AccIndex_Name_AR.value || undefined;
    this.selected_AccountsIndex.accIndex_Name_EN= this.AccIndex_Name_EN.value || undefined;
    this.selected_AccountsIndex.accIndex_Number= this.AccIndex_Number.value || undefined;
    this.selected_AccountsIndex.accIndex_Type_FK= this.AccIndex_Type_FK.value || undefined;
    this.selected_AccountsIndex.c_AccountsTypes = this.AccountsType_List.find(type => type.accType_Code == this.AccIndex_Type_FK.value);
    this.selected_AccountsIndex.accIndex_Form_FK= this.AccIndex_Form_FK.value || undefined
    this.selected_AccountsIndex.c_AccountsForms = this.AccountsForms_List.find(type => type.accForm_Code == this.AccIndex_Form_FK.value);
    this.selected_AccountsIndex.accIndex_AppearIN_FK= this.AccIndex_AppearIN_FK.value || undefined;
    
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clear(){
    this.Form.reset();
  }

  save(){
    if (!this.Form.valid == true) {
      console.log('notValid');
      return;
    }

    // fill this.selected_AccountsIndex
    this.getValue();
    console.log('this.selected_AccountsIndex', this.selected_AccountsIndex);
    if (this.data.action== 'add'){
      this.accountsIndexService.add( this.selected_AccountsIndex).subscribe(res =>{
        if (res != null && (res as AccountsIndex) != null && (res as AccountsIndex).accIndex_Code!= null ){
          this.snackBar.open('تمت الإضافة بنجاح', '', {
            duration: 3000,
            panelClass: ['green-snackbar'],
          });
        //  this.dialogRef.close(1);
        }

        else
          this.snackBar.open('حدث خطأ', '', {
            duration: 3000,
            panelClass: ['red-snackbar'],
          });
      });
    }

    else if (this.data.action== 'update'){
      this.accountsIndexService.update( this.selected_AccountsIndex).subscribe(res =>{
        if (res != null && (res as AccountsIndex) != null && (res as AccountsIndex).accIndex_Code!= null ){
          this.snackBar.open('تمت الإضافة بنجاح', '', {
            duration: 3000,
            panelClass: ['green-snackbar'],
          });
         // this.dialogRef.close(1);
        }

        else
          this.snackBar.open('حدث خطأ', '', {
            duration: 3000,
            panelClass: ['red-snackbar'],
          });
      });
    }

  }

  focusNext(id: string) {
    let element = this._document.getElementById(id);
    if (element) {
      element.focus();
    }
  }
}
