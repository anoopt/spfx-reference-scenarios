import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'TfLStatusAdaptiveCardExtensionStrings';
import { Line } from '../../types';
import { setFavouriteLine, star, starFilled } from '../tfl';
import { CARD_VIEW_REGISTRY_ID, ITfLStatusAdaptiveCardExtensionProps, ITfLStatusAdaptiveCardExtensionState } from '../TfLStatusAdaptiveCardExtension';

export interface ILinesViewData {
  lines: Line[];
}

export class LinesView extends BaseAdaptiveCardView<
  ITfLStatusAdaptiveCardExtensionProps,
  ITfLStatusAdaptiveCardExtensionState,
  ILinesViewData
> {
  public get data(): ILinesViewData {
    const { lines } = this.state;
    return {
      lines
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/LinesViewTemplate.json');
  }

  public async onAction(action: IActionArguments): Promise<void> {

    let favouritedLineId: string = (<ISubmitActionArguments>action).data.lineId;
    let favouriteUpdated: boolean = await setFavouriteLine(favouritedLineId, this.properties.favLineExtensionName);

    if (favouriteUpdated) {
      let { line, lines } = this.state;

      line = lines.find(l => l.id === favouritedLineId);
      lines = lines.map(l => {
        if (l.isFavourite) {
          return Object.assign({}, l, { isFavourite: false, favouriteIconSvg: star });
        }
        if (l.id === favouritedLineId) {
          return Object.assign({}, l, { isFavourite: true, favouriteIconSvg: starFilled });
        }
        return l;
      });

      this.setState({
        line,
        lines
      });
    } else {
      //A card view for showing error
    }

  }
}