import {Component, ViewChild} from '@angular/core';
import {SchoolChooserComponent} from "../school-chooser/school-chooser.component";
import {StudentChooserComponent} from "../student-chooser/student-chooser.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'chooser',
  standalone: true,
  imports: [
    SchoolChooserComponent,
    StudentChooserComponent,
    RouterLink
  ],
  templateUrl: './chooser.component.html',
  styleUrl: './chooser.component.less'
})
export class ChooserComponent {

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
