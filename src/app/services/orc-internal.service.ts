import { Injectable } from '@angular/core';
import * as Tesseract from 'tesseract.js';
import { DangerousSubstance } from '../models/DangerousSubstance.model';

@Injectable({
  providedIn: 'root',
})
export class OcrInternalService {
  extractText(file: File): Promise<string> {
    return Tesseract.recognize(file, 'eng+ron')
      .then(({ data: { text } }) => text)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  async processLocally(file: File): Promise<{
    text_extras: string;
    unhealthy_substances_found: DangerousSubstance[];
  }> {
    try {
      const text = await this.extractText(file);
      const words = text
        .toLowerCase()
        .split(/[\s,.;:()]+/)
        .filter((word) => word);

      const dangerousSubstances: DangerousSubstance[] = [
        {
          name_ro: 'Tartrazină',
          name_en: 'Tartrazine',
          abbreviation: 'E102',
          description:
            'Unele studii au asociat tartrazina cu reacții alergice și posibile efecte asupra comportamentului la copii (de exemplu, hiperactivitate).',
        },
        {
          name_ro: 'Galben chinolinic',
          name_en: 'Quinoline Yellow',
          abbreviation: 'E104',
          description: 'Poate cauza reacții alergice la persoanele sensibile.',
        },
        {
          name_ro: 'Galben Sunset FCF',
          name_en: 'Sunset Yellow FCF',
          abbreviation: 'E110',
          description:
            'A fost studiat pentru potențialul său de a influența comportamentul la copii.',
        },
        {
          name_ro: 'Carmoisină',
          name_en: 'Carmoisine',
          abbreviation: 'E122',
          description:
            'A suscitat controverse și a fost interzisă în unele țări din cauza unor posibile efecte adverse.',
        },
        {
          name_ro: 'Ponceau 4R',
          name_en: 'Ponceau 4R',
          abbreviation: 'E124',
          description:
            'Deși încă utilizat în anumite regiuni, a fost restricționat în altele din cauza riscurilor posibile.',
        },
        {
          name_ro: 'Roșu Allura AC',
          name_en: 'Allura Red AC',
          abbreviation: 'E129',
          description:
            'S-a discutat despre legătura cu hiperactivitatea și alte probleme comportamentale.',
        },
        {
          name_ro: 'Albastru Patent V',
          name_en: 'Patent Blue V',
          abbreviation: 'E131',
          description:
            'Unele studii au asociat această culoare cu reacții alergice și alte efecte adverse.',
        },
        {
          name_ro: 'Albastru Brilliant FCF',
          name_en: 'Brilliant Blue FCF',
          abbreviation: 'E133',
          description:
            'Unele studii au asociat această culoare cu reacții alergice și alte efecte adverse.',
        },
        {
          name_ro: 'Maro HT',
          name_en: 'Brown HT',
          abbreviation: 'E155',
          description:
            'Există controverse și informații limitate privind efectele sale.',
        },
        {
          name_ro: 'Acid benzoic',
          name_en: 'Benzoic acid',
          abbreviation: 'E210',
          description:
            'Pot forma benzen (un compus potențial cancerigen) atunci când este folosit în combinație cu vitamina C (acid ascorbic).',
        },
        {
          name_ro: 'Benzoat de sodiu',
          name_en: 'Sodium benzoate',
          abbreviation: 'E211',
          description:
            'Pot forma benzen atunci când este folosit în combinație cu vitamina C (acid ascorbic).',
        },
        {
          name_ro: 'Benzoat de potasiu',
          name_en: 'Potassium benzoate',
          abbreviation: 'E212',
          description: 'Similar ca mecanism cu E210 și E211.',
        },
        {
          name_ro: 'Benzoat de calciu',
          name_en: 'Calcium benzoate',
          abbreviation: 'E213',
          description: 'Similar ca mecanism cu E210 și E211.',
        },
        {
          name_ro: 'Nitrit de potasiu',
          name_en: 'Potassium nitrite',
          abbreviation: 'E249',
          description:
            'Pot duce la formarea nitrozaminelor (compuși cu potențial cancerigen) în anumite condiții.',
        },
        {
          name_ro: 'Nitrit de sodiu',
          name_en: 'Sodium nitrite',
          abbreviation: 'E250',
          description:
            'Pot duce la formarea nitrozaminelor în anumite condiții.',
        },
        {
          name_ro: 'Nitrat de sodiu',
          name_en: 'Sodium nitrate',
          abbreviation: 'E251',
          description:
            'Folosit ca conservant, dar poate participa la formarea compușilor cancerigeni.',
        },
        {
          name_ro: 'Nitrat de potasiu',
          name_en: 'Potassium nitrate',
          abbreviation: 'E252',
          description:
            'Folosit ca conservant, dar poate participa la formarea compușilor cancerigeni.',
        },
        {
          name_ro: 'Sodiu eritorbát',
          name_en: 'Sodium erythorbate',
          abbreviation: 'E316',
          description:
            'Folosit pentru a stabiliza efectul conservanților, cu unele discuții privind efectele sale în anumite situații.',
        },
        {
          name_ro: 'BHA (Butilhidroxianisol)',
          name_en: 'BHA (Butylated hydroxyanisole)',
          abbreviation: 'E320',
          description:
            'A fost studiat pentru potențialul său carcinogenic în anumite modele experimentale.',
        },
        {
          name_ro: 'BHT (Butilhidroxitoluen)',
          name_en: 'BHT (Butylated hydroxytoluene)',
          abbreviation: 'E321',
          description:
            'Există controverse legate de efectele sale pe termen lung.',
        },
        {
          name_ro: 'TBHQ (Tert-butilhidrochinona)',
          name_en: 'TBHQ (Tert-butylhydroquinone)',
          abbreviation: 'E319',
          description:
            'Unele studii sugerează că la doze mari ar putea avea efecte adverse.',
        },
        {
          name_ro: 'Aspartam',
          name_en: 'Aspartame',
          abbreviation: 'E951',
          description:
            'A fost intens studiat pentru posibile efecte neurologice și alte efecte adverse, deși majoritatea autorităților îl consideră sigur la doze moderate.',
        },
        {
          name_ro: 'Acid ciclamic (ciclamate)',
          name_en: 'Cyclamic acid (cyclamates)',
          abbreviation: 'E952',
          description:
            'Interzis în unele țări (ex. SUA) din cauza îngrijorărilor legate de siguranță.',
        },
        {
          name_ro: 'Sacarina',
          name_en: 'Saccharin',
          abbreviation: 'E954',
          description:
            'A fost investigat pentru un posibil risc carcinogenic, deși concluziile nu sunt unanim acceptate.',
        },
        {
          name_ro: 'Sucraloză',
          name_en: 'Sucralose',
          abbreviation: 'E955',
          description:
            'Deși utilizată pe scară largă, unele studii pun sub semnul întrebării efectele sale asupra microbiomului intestinal.',
        },
        {
          name_ro: 'Neotame',
          name_en: 'Neotame',
          abbreviation: 'E967',
          description:
            'Similară cu aspartamul, dar cu mai puține studii disponibile privind efectele pe termen lung.',
        },
        {
          name_ro: 'Glutamat monosodic (MSG)',
          name_en: 'Monosodium glutamate (MSG)',
          abbreviation: 'E621',
          description:
            'Deși aprobat și considerat sigur pentru majoritatea consumatorilor, unii oameni raportează reacții adverse (ex. cefalee), fenomen cunoscut ca „sindromul restaurantului chinezesc”.',
        },
        {
          name_ro: 'Glutamat monopotasic',
          name_en: 'Monopotassium glutamate',
          abbreviation: 'E622',
          description:
            'Folosit adesea în combinație cu MSG, poate declanșa reacții alergice la persoanele sensibile.',
        },
        {
          name_ro: 'Inozinat disodic',
          name_en: 'Disodium inosinate',
          abbreviation: 'E627',
          description:
            'Folosit adesea în combinație cu MSG, poate declanșa reacții alergice la persoanele sensibile.',
        },
        {
          name_ro: 'Guanat disodic',
          name_en: 'Disodium guanylate',
          abbreviation: 'E631',
          description:
            'Folosit adesea în combinație cu MSG, poate declanșa reacții alergice la persoanele sensibile.',
        },
        {
          name_ro: 'Mono- și digliceride de acizi grași',
          name_en: 'Mono- and diglycerides of fatty acids',
          abbreviation: 'E471',
          description:
            'Deși folosiți pe scară largă, un consum excesiv poate contribui la efecte negative asupra sănătății.',
        },
      ];

      const unhealthy_substances_found = dangerousSubstances.filter(
        (substance) =>
          words.includes(substance.name_ro.toLowerCase()) ||
          words.includes(substance.name_en.toLowerCase()) ||
          words.includes(substance.abbreviation.toLowerCase())
      );

      return {
        text_extras: text,
        unhealthy_substances_found,
      };
    } catch (error) {
      console.error('Eroare la procesarea locală a fișierului:', error);
      throw error;
    }
  }
}
