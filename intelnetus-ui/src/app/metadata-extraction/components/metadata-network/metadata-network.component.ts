import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Link, Node } from '../../models/metadata-network.model';
import { faSearchPlus, faSearchMinus, faCompress, faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-metadata-network',
  standalone: false,
  templateUrl: './metadata-network.component.html',
  styleUrl: './metadata-network.component.scss'
})
export class MetadataNetworkComponent {
  @Input() nodes: Array<Node> = [];
  @Input() links: Array<Link> = [];
  @Output() searchTriggered = new EventEmitter<void>();
  public zoomLevel: number = 1;
  public center$: Subject<boolean> = new Subject<boolean>();

  faSearchPlus = faSearchPlus;
  faSearchMinus = faSearchMinus;
  faCompress = faCompress;
  faCrosshairs = faCrosshairs;

  constructor() {}

  // Graph control methods
  zoomIn(): void {
    // Implementation for zoom in functionality
    this.zoomLevel += 0.1;
    console.log('Zoom in clicked');
  }

  zoomOut(): void {
    // Implementation for zoom out functionality
    this.zoomLevel -= 0.1;
    console.log('Zoom out clicked');
  }

  resetZoom(): void {
    // Implementation for reset zoom functionality
    this.zoomLevel = 1;
    console.log('Reset zoom clicked');
  }

  centerGraph(): void {
    this.center$.next(true);
    console.log('Center graph clicked');
  }

  triggerSearch(): void {
    this.searchTriggered.emit();
  }

  // Get icon based on node type
  getNodeIcon(type: string): string {
    switch (type?.toLowerCase()) {
      case 'publication':
        return '📄';
      case 'author':
        return '👤';
      case 'organization':
        return '🏢';
      default:
        return '🔗';
    }
  }
}
