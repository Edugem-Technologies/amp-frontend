export function sliceWithEllipsis(name: string | undefined | null, sliceLimit: number): string {
    const slicedName = name?.slice(0, sliceLimit) || ""
    const ellipsis = name?.length && name.length > sliceLimit ? "  ..." : ""
    return slicedName ? slicedName + ellipsis : ""
}
