import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    FormBuilder, FormGroup, Validators, ReactiveFormsModule 
} from '@angular/forms';
// CORRECCIÓN CLAVE: Agregar RouterLink aquí
import { ActivatedRoute, Router} from '@angular/router'; 
import { 
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, 
    IonInput, IonButton, IonIcon, IonButtons, IonSelect, IonSelectOption,
    IonBackButton // <-- ¡CORRECCIÓN 1: Añadido para el back button!
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular'; // <-- AlertController es un servicio/clase, se importa así
import { addIcons } from 'ionicons';
import { arrowBackOutline, saveOutline, trashOutline } from 'ionicons/icons';

// Reutilizamos la interfaz del paciente
interface Paciente {
    id: number;
    nombre: string;
    rut: string;
    piso: number;
    turno: 'Mañana' | 'Tarde' | 'Noche';
}

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.page.html',
    styleUrls: ['./detalle.page.scss'],
    standalone: true,
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, 
        IonInput, IonButton, IonIcon, IonButtons, IonSelect, IonSelectOption,
        IonBackButton // <-- ¡CORRECCIÓN 2: Incluido en el array!
    ]
})
export class DetallePage implements OnInit {

    pacienteForm!: FormGroup;
    pacienteActual!: Paciente; 
    turnos = ['Mañana', 'Tarde', 'Noche'];
    private readonly ID_PATTERN = /^[0-9]{7,9}-[0-9kK]$/; 

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertController: AlertController // Inyectado para ion-alert (Punto C.4)
    ) { 
        addIcons({ arrowBackOutline, saveOutline, trashOutline });
    }

    ngOnInit() {
        const pacienteIdParam = this.route.snapshot.paramMap.get('id');
        const idSimulado = pacienteIdParam ? parseInt(pacienteIdParam) : 2; 

        this.pacienteActual = this.simularCargaPaciente(idSimulado);

        this.pacienteForm = this.fb.group({
            nombre: [this.pacienteActual.nombre, [Validators.required, Validators.minLength(3)]],
            idPaciente: [this.pacienteActual.rut, [Validators.required, Validators.pattern(this.ID_PATTERN)]],
            piso: [this.pacienteActual.piso, [Validators.required, Validators.min(1)]],
            turno: [this.pacienteActual.turno, Validators.required]
        });
    }

    simularCargaPaciente(id: number): Paciente {
        const datosSimulados: Paciente[] = [
            { id: 1, nombre: 'Ana María Soto', rut: '19.456.789-K', piso: 3, turno: 'Mañana' },
            { id: 2, nombre: 'Roberto González', rut: '15.123.456-7', piso: 5, turno: 'Tarde' },
            { id: 3, nombre: 'Javier Fuentes', rut: '18.987.654-2', piso: 1, turno: 'Noche' },
            { id: 4, nombre: 'Laura Pérez', rut: '20.555.111-9', piso: 3, turno: 'Mañana' },
        ];
        return datosSimulados.find(p => p.id === id) || datosSimulados[0];
    }

    guardarCambios() {
        if (this.pacienteForm.valid) {
            console.log('✅ Paciente actualizado. ID:', this.pacienteActual.id, 'Datos:', this.pacienteForm.value);
            this.router.navigate(['/listado']);
        } else {
            console.log('❌ Formulario inválido para actualización.');
            this.pacienteForm.markAllAsTouched();
        }
    }

    async mostrarConfirmacionEliminar() {
        const alert = await this.alertController.create({
            header: 'Confirmar Eliminación',
            message: `¿Estás seguro de que deseas **eliminar** al paciente ${this.pacienteActual.nombre}? Esta acción es irreversible.`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                },
                {
                    text: 'Eliminar',
                    role: 'destructive',
                    handler: () => {
                        this.eliminarPaciente();
                    },
                },
            ],
        });
        await alert.present();
    }

    eliminarPaciente() {
        console.log(`🔥 Paciente ${this.pacienteActual.id} eliminado del sistema.`);
        this.router.navigate(['/listado']);
    }
}