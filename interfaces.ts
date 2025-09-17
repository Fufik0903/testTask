
export interface workType {
  id: number;
  name: string;
  nameGt5: string;
  nameLt5: string;
  nameOne: string;
}
export interface listItem {
  id: string;
  logo: string;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: string;
  planWorkers: string;
  workTypes: workType[];
  priceWorker: string;
  customerFeedbacksCount: string;
  customerRating: string;
}
export interface Coordinates {
  longitude: number;
  latitude: number;
}
