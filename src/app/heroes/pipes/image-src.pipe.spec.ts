import { ImageSrcPipe } from '../pipes/image-src.pipe';

describe('ImageSrcPipe', () => {
  it('create an instance', () => {
    const pipe = new ImageSrcPipe();
    expect(pipe).toBeTruthy();
  });
});
