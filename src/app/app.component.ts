import {Component, ViewChild} from '@angular/core';
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

  @ViewChild(StudentChooserComponent, {static: true}) studentChooser: StudentChooserComponent;
  @ViewChild(SchoolChooserComponent, {static: true}) schoolChooser: SchoolChooserComponent;

  buildEnrollButtonDisplay(): string {
    const count = this.studentChooser.getSelectedCount();
    const plural = this.plural('Student', count);

    return `Enroll ${count} ${plural}`;
  }

  hasValidSelection(): boolean {
    const hasStudents = this.studentChooser.getSelectedCount();
    const hasSchool = this.schoolChooser.getSelectedSchool();

    return hasSchool && hasStudents;
  }

  enroll(): void {
    const selectedStudents = this.studentChooser.getSelected();
    this.schoolChooser.enroll(selectedStudents);
    this.studentChooser.enroll();
  }

  private plural(word: string, count: number): string {
    return count === 1 ? word : word + 's';
  }
}
