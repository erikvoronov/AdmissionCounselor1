import {Component} from '@angular/core';
import {JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {StudentService} from "../services/student.service";
import {SortPipe} from "../sort.pipe";

@Component({
  selector: 'student-chooser',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    NgClass,
    NgIf,
    SortPipe
  ],
  templateUrl: './student-chooser.component.html',
  styleUrl: './student-chooser.component.less'
})
export class StudentChooserComponent {

  students;

  constructor(
    private studentService: StudentService)
  {
    this.subscribeToStudents();
  }

  private subscribeToStudents(): void {
    this.studentService.data
      .subscribe(students => {
        this.students = students;
        this.students.forEach(s => s.sortName = s.name.last);
      });
  }

  buildNameLine(student): string {
    const first = student.name.first;
    const last = student.name.last;
    const age = student.dob.age;

    return `${first} ${last} (${age})`;
  }

  buildAddressLine(student): string {
    const loc = student.location;
    return `${loc.city}, ${loc.state}, ${loc.country}`;
  }

  getSelectedCount(): any {
    console.log('student-chooser.component.ts', 'students', this.students);
    return this.students && this.students.filter(s => s.isSelected).length;
  }

  getSelected(): any[]{
    return this.students.filter(s => s.isSelected);
  }

  enroll(): void {
    this.getSelected().forEach(s => {
      s.isEnrolled = true;
      s.isSelected = false;
    })
  }
}
