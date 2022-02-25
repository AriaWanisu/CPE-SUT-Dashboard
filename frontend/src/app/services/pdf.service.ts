import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  createPdf(head,data,title) {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(title + 'data', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: head,
      body: data,
      theme: 'striped',
      didDrawCell: data => {
        console.log(data.column.index)
      }
    })

    // below line for Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save(title+'.pdf');
  }

}
