import { NestedTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { ConfirmationdialogComponent } from 'src/app/modules/shared/components/confirmationdialog/confirmationdialog.component';
import { AccountsIndex } from 'src/app/modules/shared/models/AccountsIndex';
import { AccountsIndexService } from 'src/app/modules/shared/services/AccountsIndex.service';
import { GeneralAccountsEditComponent } from '../general-accounts-edit/general-accounts-edit.component';


@Component({
  selector: 'app-general-accounts',
  templateUrl: './general-accounts-list.component.html',
  styleUrls: ['./general-accounts-list.component.scss']
})

export class GeneralAccountsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  _Selected_AccountsIndex: AccountsIndex | undefined | null = undefined;
  AccountsIndex_List: AccountsIndex[] = [];
  dataSource = new MatTreeNestedDataSource<AccountsIndex>();


  displayedColumns: string[] = ['type', 'account', 'code', 'action'];
  tableDataSource: MatTableDataSource<AccountsIndex>;
  pageSizeOptions: number[] = [10, 25, 100];


  treeControl = new NestedTreeControl<AccountsIndex>(node => node.children);
  hasChild = (_: number, node: AccountsIndex) => !!node.children && node.children.length > 0;

  LoadingFinish: boolean = true;

  Subscription: Subscription = new Subscription();

  excelData: any[] = [];

  excelOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'الحسابات العامة',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: false,
    headers: ['الحساب', 'كود الحساب']
  };

  constructor(private accountsIndexService: AccountsIndexService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.tableDataSource = new MatTableDataSource([{}]);
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.Subscription != null)
      this.Subscription.unsubscribe();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
  }

  loadData() {
    this.LoadingFinish = false;
    // For Clean Subscribe
    this.Subscription.add(

      forkJoin(
        this.load_AccountsIndexs(),
        this.BuildTree()
      ).subscribe(res => {
        this.AccountsIndex_List = res[0];
        this.dataSource.data = [res[1]];
        if (res[1] != null) {
          this.SelectNode(res[1]);
        }
      }
      )
    );

    this.LoadingFinish = true;
  }

  load_AccountsIndexs(): Observable<AccountsIndex[]> {
    return this.accountsIndexService.list();
  }
  BuildTree(): Observable<AccountsIndex> {
    return this.accountsIndexService.BuildTree();
  }

  SelectNode(node: AccountsIndex) {
    this._Selected_AccountsIndex = node;
    this.tableDataSource.data = [];

    if (node.accIndex_Code != null && node.accIndex_Code > 0)
      this.accountsIndexService.getbycode(node.accIndex_Code).subscribe(
        res => {

          if (res != null && res.children != null) {
            this.tableDataSource.data = res.children;
            this.treeControl.expand(res);
          }
        }
      )

  }



  Delete(node: AccountsIndex) {
    const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
      data: { message: 'هل أنت متأكد؟', buttonText: { ok: 'نعم', cancel: 'الغاء الأمر' } },
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res == 1) {
        this.accountsIndexService.delete(node.accIndex_Code!).subscribe(res => {
          if (res == 1) {
            this.snackBar.open('تم الحذف بنجاح', '', {
              duration: 3000,
              panelClass: ['green-snackbar'],
            });
          }
        })
      }
    });


  }


  Update(node: AccountsIndex) {

    const dialogRef = this.dialog.open(GeneralAccountsEditComponent, {
      data: { type: 'group', action: 'update', node: node },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        //update tree
        let emptyArray: AccountsIndex[] = [];
        this.accountsIndexService.BuildTree().subscribe(res => {
          emptyArray.push(res);
          this.dataSource.data = emptyArray;
          // update table
          this.accountsIndexService.getbycode(node.accIndex_Parent_Code_FK!).subscribe(res => {
            this.SelectNode(res);
          });
        });
      }
    });
  }

  addGroup(ParentNode: AccountsIndex) {
    console.log(ParentNode);
    let AccountsIndex: AccountsIndex = {
      accIndex_Parent_Code_FK: ParentNode.accIndex_Code,
      accIndex_NodeType_FK: 1
    }
    console.log(AccountsIndex);
    const dialogRef = this.dialog.open(GeneralAccountsEditComponent, {
      data: { type: 'group', action: 'add', node: AccountsIndex },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        //update tree
        this.Subscription.add(
          this.BuildTree().subscribe(res => {
            this.dataSource.data = [res];
            if (res != null)
              this.SelectNode(ParentNode);
          })
        );
      }
    });
  }

  addAcount(ParentNode: AccountsIndex) {

    let AccountsIndex: AccountsIndex = {
      accIndex_Parent_Code_FK: ParentNode.accIndex_Code,
      accIndex_NodeType_FK: 2
    }

    const dialogRef = this.dialog.open(GeneralAccountsEditComponent, {
      data: { type: 'account', action: 'add', node: AccountsIndex },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        //update tree
        this.Subscription.add(
          this.BuildTree().subscribe(res => {
            this.dataSource.data = [res];
            if (res != null)
              this.SelectNode(ParentNode);
          })
        );

      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  exportToExcel() {
    //  const csvExporter = new ExportToCsv(this.excelOptions);
    // csvExporter.generateCsv(this.excelData);
  }
}
