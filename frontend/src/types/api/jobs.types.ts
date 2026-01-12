export interface IJob {
  id: number;
  title: string;
  status: string;
}

export interface IJobs {
  message: string;
  result: IJob[];
}
