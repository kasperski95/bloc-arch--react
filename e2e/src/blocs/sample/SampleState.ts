import { BlocState } from '@bloc-arch/core'

export abstract class SampleState extends BlocState {}

export class Initial extends SampleState {}

export class NotInitial extends SampleState {}
