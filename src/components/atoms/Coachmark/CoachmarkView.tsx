import React, {Component} from 'react';
import CoachmarkContent from './CoachmarkContent';
import CoachmarkArrow from './CoachmarkArrow';
import {CoachmarkPosition, CoachmarkViewProps} from './types';

export default class CoachmarkView extends Component<CoachmarkViewProps> {
  static defaultProps: Pick<CoachmarkViewProps, 'position' | 'renderArrow'> = {
    position: CoachmarkPosition.TOP,
    renderArrow: ({x, position, arrowOffset}) => (
      <CoachmarkArrow x={x} position={position} arrowOffset={arrowOffset} />
    ),
  };

  renderCoachmarkContent() {
    const {
      message,
      title,
      leadingIcon,
      buttonOnContent,
      onNext,
      onPrev,
      buttonPrevText,
      buttonSkipText,
      onSkip,
      queue,
      totalCoachmark,
      buttonFinishText,
    } = this.props;
    return (
      <CoachmarkContent
        title={title}
        message={message}
        leadingIcon={leadingIcon}
        buttonOnContent={buttonOnContent}
        buttonFinishText={buttonFinishText}
        onNext={onNext}
        onPrev={onPrev}
        buttonPrevText={buttonPrevText}
        buttonSkipText={buttonSkipText}
        onSkip={onSkip}
        queue={queue}
        totalCoachmark={totalCoachmark}
      />
    );
  }

  renderCoachmarkArrow() {
    const {renderArrow, x, position, arrowOffset} = this.props;
    return renderArrow({x, position, arrowOffset});
  }

  render() {
    const {position} = this.props;
    return position === CoachmarkPosition.TOP ? (
      <>
        {this.renderCoachmarkArrow()}
        {this.renderCoachmarkContent()}
      </>
    ) : (
      <>
        {this.renderCoachmarkContent()}
        {this.renderCoachmarkArrow()}
      </>
    );
  }
}
