import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST ?? 'smtp.gmail.com',
    port: 2525,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async envoyerConfirmation(
    destinataire: string,
    nom: string,
    ressource: string,
    dateDebut: Date,
    dateFin: Date,
  ) {
    await this.transporter.sendMail({
      from: `"YSync" <${process.env.MAIL_USER}>`,
      to: destinataire,
      subject: '✅ Confirmation de votre réservation',
      html: `
        <h2>Bonjour ${nom},</h2>
        <p>Votre réservation a bien été enregistrée.</p>
        <ul>
          <li><strong>Ressource :</strong> ${ressource}</li>
          <li><strong>Début :</strong> ${dateDebut.toLocaleString('fr-FR')}</li>
          <li><strong>Fin :</strong> ${dateFin.toLocaleString('fr-FR')}</li>
        </ul>
        <p>À bientôt sur YSync !</p>
      `,
    });
  }

  async envoyerRappel(
    destinataire: string,
    nom: string,
    ressource: string,
    dateDebut: Date,
  ) {
    await this.transporter.sendMail({
      from: `"YSync" <${process.env.MAIL_USER}>`,
      to: destinataire,
      subject: '🔔 Rappel : votre réservation est demain',
      html: `
        <h2>Bonjour ${nom},</h2>
        <p>Rappel : vous avez une réservation demain.</p>
        <ul>
          <li><strong>Ressource :</strong> ${ressource}</li>
          <li><strong>Début :</strong> ${dateDebut.toLocaleString('fr-FR')}</li>
        </ul>
        <p>À demain sur YSync !</p>
      `,
    });
  }
}
