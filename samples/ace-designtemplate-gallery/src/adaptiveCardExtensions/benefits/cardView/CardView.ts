import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'BenefitsAdaptiveCardExtensionStrings';
import { IBenefitsAdaptiveCardExtensionProps, IBenefitsAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../BenefitsAdaptiveCardExtension';

export class CardView extends BasePrimaryTextCardView<IBenefitsAdaptiveCardExtensionProps, IBenefitsAdaptiveCardExtensionState> {


  public get data(): IPrimaryTextCardParameters {
    return {
      primaryText: strings.PrimaryText,
      description: this.properties.description
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'QuickView',
      parameters: {
        view: QUICK_VIEW_REGISTRY_ID
      }
    };
  }
}
