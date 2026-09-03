export interface ResponsivePhotoVariant<TWidth extends number = number> {
  fileWidth: TWidth;
  outputWidth: number;
}

export function getResponsivePhotoVariants<TWidth extends number>(
  sourceWidth: number,
  targetWidths: readonly TWidth[],
): ResponsivePhotoVariant<TWidth>[] {
  if (!Number.isInteger(sourceWidth) || sourceWidth <= 0) {
    throw new Error(`photo source width must be a positive integer; received ${sourceWidth}`);
  }
  if (targetWidths.length === 0) {
    throw new Error("at least one responsive photo target width is required");
  }

  const variantsByOutputWidth = new Map<number, ResponsivePhotoVariant<TWidth>>();
  for (const fileWidth of targetWidths) {
    const outputWidth = Math.min(fileWidth, sourceWidth);
    variantsByOutputWidth.set(outputWidth, { fileWidth, outputWidth });
  }

  return [...variantsByOutputWidth.values()].sort(
    (left, right) => left.outputWidth - right.outputWidth,
  );
}
