import { Routes } from '@angular/router';
import {ChooserComponent} from "./chooser/chooser.component";
import {StudentChooserComponent} from "./student-chooser/student-chooser.component";
import {StudentViewComponent} from "./student-view/student-view.component";

export const routes: Routes = [
  {
    path: '',
    component: ChooserComponent
  },
  {
    path: 'student/:studentId',
    component: StudentViewComponent
  }
];
