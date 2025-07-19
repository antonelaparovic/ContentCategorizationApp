import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-prompt-input',
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './prompt-input.component.html',
  styleUrl: './prompt-input.component.css'
})
export class PromptInputComponent {
  form: FormGroup;
  @Output() submitText = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      text: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const prompt = this.form.value.text.trim();
      this.submitText.emit(prompt);
    }
  }
}
