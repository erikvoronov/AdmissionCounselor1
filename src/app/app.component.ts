import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {SchoolChooserComponent} from "./school-chooser/school-chooser.component";
import {StudentChooserComponent} from "./student-chooser/student-chooser.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgOptimizedImage, SchoolChooserComponent, StudentChooserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AdmissionsCounselor';

  buildEnrollButtonDisplay(studentChooser: StudentChooserComponent): string {
    const count = studentChooser.getSelectedCount();
    const plural = this.plural('Student', count);

    return `Enroll ${count} ${plural}`;
  }

  hasValidSelection(studentChooser: StudentChooserComponent, schoolChooser: SchoolChooserComponent): boolean {
    const hasStudents = studentChooser.getSelectedCount();
    const hasSchool = schoolChooser.getSelectedSchool();

    return hasSchool && hasStudents;
  }

  enroll(studentChooser: StudentChooserComponent, schoolChooser: SchoolChooserComponent): void {
    const selectedStudents = studentChooser.getSelected();
    schoolChooser.enroll(selectedStudents);
    studentChooser.enroll();
  }

  private plural(word: string, count: number): string {
    return count === 1 ? word : word + 's';
  }
}
