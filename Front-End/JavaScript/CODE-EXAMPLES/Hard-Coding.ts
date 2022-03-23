
interface TypeInterface {
  [key: string]: string;
}

class testExampleTS {

  getTypeIconSingle = (iconType: string): string => {
    let result: string = 'page';
    
    if (iconType === 'dashboard') {
      result = 'dash_space';
    }

    return result;
  };

  getTypeIconAndStateClasses1 = (iconType: string, status: string): string => {
    let result: Array<string> = [];
    
    switch (true) {
      case (iconType === 'dashboard'):
        result.push('dash_space');
        break;
      case (iconType === 'page'):
        result.push('page');
        break;
      default:
        result.push('page');
        break;
    }

    if (status === 'done') {
      result.push('done');
    } else {
      result.push('in-progress');
    }

    return result.join(' ');
  };
  
  types: TypeInterface = {
    dashboard: 'dash_space',
    page: 'page'
  };
  
  newFN = () => {};

  getTypeIcon = (iconType: string): string => this.types[iconType] || 'page';
  getTypeStatus = (status: string): string => (status === 'done') ? 'done' : 'in-progress';

  getTypeClasses = (iconType: string, status: string): string => {
    const icon: string = this.getTypeIcon(iconType);
    const state: string = this.getTypeStatus(status);
    return `${ icon } ${ state }`;
  };

  getTypeClassesShortest = (iconType: string, status: string): string => `${ this.types[iconType] || 'page' } ${ (status === 'done') ? 'done' : 'in-progress' }`;
  
}
