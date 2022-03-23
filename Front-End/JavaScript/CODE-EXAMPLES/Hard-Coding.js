
class testExampleJS {

  getTypeIconSingle = (iconType) => {
    let result = 'page';
    
    if (iconType === 'dashboard') {
      result = 'dash_space';
    }

    return result;
  };

  getTypeIconAndStateClasses1 = (iconType, status) => {
    let result = [];
    
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
  
  types = {
    dashboard: 'dash_space',
    page: 'page'
  };
  
  getTypeIcon = (iconType) => this.types[iconType] || 'page';
  getTypeStatus = (status) => (status === 'done') ? 'done' : 'in-progress';

  getTypeClasses = (iconType, status) => {
    const icon = this.getTypeIcon(iconType);
    const state = this.getTypeStatus(status);
    return `${ icon } ${ state }`;
  };

  getTypeClassesShortest = (iconType, status) => `${ this.types[iconType] || 'page' } ${ (status === 'done') ? 'done' : 'in-progress' }`;
  
}
