import { createAction, props } from "@ngrx/store";
import { GetMetadataRequest } from "../../models/metadata-extraction.model";

export const LoadMetadata = createAction('[Metadata Extraction] Load metadata', props<GetMetadataRequest>());
export const LoadMetadataSuccess = createAction('[Metadata Extraction] Load metadata success', props<any>());