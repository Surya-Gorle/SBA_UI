export class ProjectEntity {
    ProjectID :Number;
    ProjectDesc:string;
    ProjStartDate:Date;
    ProjEndDate:Date;
    ProjPriority:number;
    ProjCompleted:Boolean;
    TotalTasks:Number;
    CompletedTasks:number;
    editmode:Boolean;
    savetype:string;
    ManagerName:string;
    ManagerID:Number;
}
