import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JsonPipe} from "@angular/common";
import {StudentChooserComponent} from "../student-chooser/student-chooser.component";

@Component({
  selector: 'student-view',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './student-view.component.html',
  styleUrl: './student-view.component.less'
})
export class StudentViewComponent {
  student;

  @ViewChild(StudentChooserComponent, { static: false }) studentChooser: StudentChooserComponent;

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.subscribeToRouteParams();
  }

  private subscribeToRouteParams(): void {
    this.route.paramMap.subscribe(params => {
      const studentId = params.get('studentId');
      if (this.studentChooser?.students) {
        this.student = this.studentChooser.students.find(s => s.login.uuid === studentId);
      } else {
        console.error('Students data is not yet available.');
      }
    });
  }
}
